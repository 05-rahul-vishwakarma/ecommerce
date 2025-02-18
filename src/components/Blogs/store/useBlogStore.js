import { create } from 'zustand';
import axios from 'axios';

const useBlogStore = create((set, get) => ({
    // State
    content: '',
    createdTime: '',
    updatedTime: '',
    images: [],
    title: '',
    author: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    isSubmitting: false,
    content: '',
    setContent: (state) => set({ content: state }),

    selectedCategory: "", // Stores selected category
    setSelectedCategory: (category) => set({ selectedCategory: category }),

    color: '',
    setColor: (state) => set({ color: state }),

    // Actions
    initializeTimes: () => {
        const currentTime = new Date().toISOString().slice(0, 16);
        set({ createdTime: currentTime, updatedTime: currentTime });
    },

    setField: (field, value) => set({ [field]: value }),

    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('ecommerce', file);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            return result.imageUrl || null;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    },

    setThumbnail: async (file) => {
        const imageUrl = await get().uploadImage(file);
        if (imageUrl) {
            set(state => ({ images: [imageUrl, ...state.images.slice(1)] }));
        }
    },

    addImages: async (files) => {
        const uploadPromises = Array.from(files).map(file => get().uploadImage(file));
        const newUrls = (await Promise.all(uploadPromises)).filter(url => url);
        set(state => ({ images: [...state.images, ...newUrls] }));
    },

    submitBlogPost: async () => {
        set({ isSubmitting: true });
        const currentTime = new Date().toISOString().slice(0, 16);
        set({ updatedTime: currentTime });

        const blogData = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE,
            metaTitle: get().metaTitle,
            metaDescription: get().metaDescription,
            title: get().title,
            description: get().description,
            content: get().content,
            author: get().author,
            BlogImage: get().images,
            category: get().selectedCategory,
            color: get().color,
            openGraph: {
                image: get().images,
                description: get().metaDescription,
                siteName: 'the ribbon pack',
                type: 'blog',
                title: get().metaTitle,
                locale: 'en_US',
                imageAlt: 'blog',
            },
            twitterCard: {
                description: get().metaDescription,
                image: get().images,
                site: 'the ribbon pack',
                title: get().metaTitle,
            },
        };

        const token = localStorage.getItem('accessToken');

        if (!token) {
            toast.error('Unauthorized: No token found');
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/meta-content/blog`,
                blogData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Sending token in the headers
                    }
                }
            );
            console.log('Blog submitted successfully');
        } catch (error) {
            console.error('Error submitting blog:', error);
        } finally {
            set({ isSubmitting: false });
        }
    },
}));

export default useBlogStore;


