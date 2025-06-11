"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile, updateProfile, getAuthHeaders } from "@/api/baseApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  User,
  MapPin,
  Calendar,
  Home,
  MapIcon as City,
  Hash,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getProfile, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setProfile(data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile. Please try again later.");
      toast.error("Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dob: data.dob,
      address_1: data.address_1,
      address_2: data.address_2,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
    };

    try {
      const response = await fetch(updateProfile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      await response.json();
      toast.success("Profile updated successfully 😊");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple to-purple-800">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple to-purple-800">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardContent className="p-6">
            <p className="text-red mb-4 text-center">{error}</p>
            <Button
              onClick={fetchProfile}
              className="w-full bg-gradient-to-r from-purple to-purple hover:from-purple hover:to-purple text-white transition-all duration-300"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple to-purple-800">
        <p className="text-white text-xl">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple to-purple text-white p-6">
          <h1 className="text-3xl font-bold">Personal Information</h1>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full  bg-gradient-to-br from-purple to-purple-800 flex items-center justify-center shadow-lg">
              <User size={64} className="text-white" />
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { label: "First Name", value: profile.firstName, icon: User },
                  { label: "Last Name", value: profile.lastName, icon: User },
                  { label: "Gender", value: profile.gender, icon: User },
                  {
                    label: "Date of Birth",
                    value: profile.dob,
                    icon: Calendar,
                  },
                  {
                    label: "Address",
                    value: `${profile.address_1} ${profile.address_2}`,
                    icon: Home,
                  },
                  { label: "City", value: profile.city, icon: City },
                  { label: "State", value: profile.state, icon: MapPin },
                  { label: "Pincode", value: profile.pincode, icon: Hash },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                    <Label className="text-secondary flex items-center mb-2">
                      <item.icon size={18} className="mr-2" />
                      {item.label}
                    </Label>
                    <p className="font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-purple to-purple hover:from-purple hover:to-purple text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      name: "firstName",
                      label: "First Name",
                      icon: User,
                      type: "text",
                    },
                    {
                      name: "lastName",
                      label: "Last Name",
                      icon: User,
                      type: "text",
                    },
                    {
                      name: "gender",
                      label: "Gender",
                      icon: User,
                      type: "select",
                    },
                    {
                      name: "dob",
                      label: "Date of Birth",
                      icon: Calendar,
                      type: "date",
                    },
                    {
                      name: "address_1",
                      label: "Address Line 1",
                      icon: Home,
                      type: "text",
                    },
                    {
                      name: "address_2",
                      label: "Address Line 2",
                      icon: Home,
                      type: "text",
                    },
                    { name: "city", label: "City", icon: City, type: "text" },
                    {
                      name: "state",
                      label: "State",
                      icon: MapPin,
                      type: "text",
                    },
                    {
                      name: "pincode",
                      label: "Pincode",
                      icon: Hash,
                      type: "text",
                    },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="flex items-center text-secondary"
                      >
                        <field.icon size={18} className="mr-2" /> {field.label}
                      </Label>
                      {field.type === "select" ? (
                        <Select
                          name={field.name}
                          defaultValue={profile[field.name]}
                        >
                          <SelectTrigger className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500 bg-white">
                            <SelectValue
                              placeholder={`Select ${field.label}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          defaultValue={profile[field.name]}
                          className="w-full border-purple-300 focus:border-purple-500 focus:ring-purple-500 bg-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple to-purple hover:from-purple hover:to-purple text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Update Profile
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.form>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
