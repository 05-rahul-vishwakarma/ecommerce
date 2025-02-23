exports.getRazorpayKey = async (req, res) => {
    try {
      razorpayKey = await orderService.razorpayKey()
  
      res.status(200).json({ key: razorpayKey })
    } catch (error) {
      logger.error(error.message)
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  exports.createTransaction = async (req, res) => {
    try {
  
      const { packageId, pricingId, finalAmount, couponCode } = req.body
      if (!packageId || !pricingId || !finalAmount) {
        return res.status(400).json({ error: "Missing required fields: packageId, pricingId, and finalAmount must be provided." });
      }
  
  
  
  
      //fetch Data and verify
      packageData = await db.package.findById(packageId).select('')
      if (!packageData) {
        return res.status(404).json({ error: "Package not found with the given ID." });
      }
      const pricing = packageData.pricings.find(pricing => pricing._id.toString() === pricingId);
      if (!pricing) {
        return res.status(404).json({ error: "Pricing not found within the given package." });
      }
  
      // Optional: Verify the coupon if provided
      let couponData = null;
      if (couponCode) {
        couponData = packageData.coupons.find(coupon => coupon.code === couponCode);
        if (!couponData) {
          return res.status(404).json({ error: "Coupon not Valid." });
        }
        // Optionally check if the coupon is still valid based on expiresIn or any other criteria
        // if (couponData.expiresIn && couponData.expiresIn < Date.now()) {
        //   return res.status(400).json({ error: "Coupon has expired." });
        // }
      }
  
      // verify pricing
  
      let amount = pricing.price;
      let gst = packageData.gst;
  
      // Optional: Verify the coupon if provided
      if (couponCode) {
        const coupon = packageData.coupons.find(coupon => coupon.code === couponCode);
        if (!coupon) {
          return res.status(404).json({ error: "Coupon not found within the given package." });
        }
        // Check if the coupon is still valid based on expiresIn or any other criteria
        // if (coupon.expiresIn && coupon.expiresIn < Date.now()) {
        //   return res.status(400).json({ error: "Coupon has expired." });
        // }
        // Apply the coupon discount if applicable
        const discount = (amount * (parseFloat(coupon.discount.replace('%', '')) / 100));
        amount -= discount;
      }
  
      // Calculate GST
      const gstAmount = (amount * gst) / 100;
      amount += gstAmount;
      logger.debug(Math.floor(amount))
      if (finalAmount != Math.floor(amount)) {
        return res.status(404).json({ error: "Price calculation invalid!" });
      }
      // verify If already purchased and have validity
      currentDate = new Date()
      // console.log(currentDate)
      existingTransaction = await db.transaction.findOne({
        user: req.userData.userId,
        package: packageId,
        status: "success",
        validity: { $gte: currentDate }
      })
      if (existingTransaction) {
        return res.status(409).json({ message: "You already have a valid subscription for this package." });
      }
  
  
      //...................All Verification passed...................................
      // create transaction order
  
      // check validity, if not available , find
      let validityEndDate = new Date();
      if (!pricing.validity) {
        logger.debug("create validity")
        pricing.validity = validityEndDate.setMonth(validityEndDate.getMonth() + (pricing.duration.includes("6 Months") ? 6 : 1));
      }
  
  
      const newTransaction = {
        package: packageId,
        user: req.userData.userId,
        pricing: pricingId,
        amount: finalAmount,
        validity: pricing.validity
      }
  
      transactionD = await db.transaction.create(newTransaction)
  
      logger.debug(transactionD)
  
  
      orderData = await orderService.paymentOrder(transactionD)
  
      res.status(200).json(orderData)
    } catch (error) {
      logger.error(error.message)
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  exports.transactionVerify = async (req, res) => {
    try {
      const { transactionId, razorpayPaymentId, razorpaySignature } = req.body
      if (!transactionId || !razorpayPaymentId || !razorpaySignature) {
        return res.status(400).json({ error: "Enter required field.!" })
      }
      // search transaction
      transaction = await db.transaction.findOne({ _id: transactionId, user: req.userData.userId })
      if (!transaction) {
        return res.status(400).json({ error: "transactionId is not valid!" })
      }
      if (transaction.status == "success") {
        return res.status(400).json({ error: "Transaction already completed!" })
      }
      if (transaction.status == "failed") {
        return res.status(400).json({ error: "Transaction failed!, Try again!" })
      }
  
  
      verifyPayment = await orderService.verifyPayment(transaction.transactionOrderId, razorpayPaymentId, razorpaySignature)
      if (!verifyPayment) {
        await db.transaction.updateOne({ _id: ObjectId(transactionId) }, { $set: { status: "failed" } });
        return res.status(400).json({ error: "Payment verification failed!" });
      }
  
  
      // update transaction incomplete -> success
      updateT = await db.transaction.updateOne({ _id: transactionId }, { $set: { status: "success" } })
  
      // to add user permission to (transaction.package) access...
      programs = await db.program.find({ packages: transaction.package }).select('programName')
  
  
      const user = await db.user.findOne({ _id: req.userData.userId });
  
      if (!user.programs) {
        user.programs = [];
      }
      let existingProgramsByName = new Map(user.programs.map(p => [p.programName, p]));
      let updatedPrograms = [];
  
      // Iterate over potential programs to update
      programs.forEach(program => {
        const programName = program.programName;
        const existingProgram = existingProgramsByName.get(programName);
        const newValidity = transaction.validity
  
        if (existingProgram) {
          // Update validity if the new one is greater
          if (newValidity > existingProgram.validity) {
            existingProgram.validity = newValidity;
          }
          updatedPrograms.push(existingProgram);
        } else {
          // Add new program if it does not exist
          updatedPrograms.push({ programName: programName, validity: newValidity });
        }
      });
  
      updateUser = await db.user.updateOne({ _id: req.userData.userId }, { $set: { programs: updatedPrograms } }, { new: true })
  
      return res.status(200).json({ success: true, redirectTo: "/test/engineering" })
    } catch (error) {
      logger.error(error.message)
      return res.status(500).json({ error: error.message });
    }
  
  }
  
  exports.refundPayment = async (req, res) => {
    try {
      const { transactionId, razorpayPaymentId, amount } = req.body
      if (!transactionId || !razorpayPaymentId || !amount) {
        res.status(400).json({ error: "Enter required field.!" })
      }
  
      const razorpayRefund = await orderService.refundPayment(transactionId, razorpayPaymentId, amount);
      return res.status(200).json(razorpayRefund);
  
    } catch (error) {
      logger.error(error.message)
      return res.status(500).json({ error: error.message });
    }
  }