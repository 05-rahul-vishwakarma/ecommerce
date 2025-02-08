export interface TestimonialType {
  img?: string; // Optional image URL
  id: string; // Unique identifier (mapped from SK)
  rating: number; // Rating (e.g., 4)
  name: string; // Name of the person/business
  businessType: string; // Type of business (e.g., "SUBHI_E_LTD")
  description?: string; // Optional description
  type: string; // Type of testimonial (e.g., "SUBHI_E_LTD_TESTIMONIAL")
}