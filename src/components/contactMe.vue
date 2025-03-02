<template>
    <div class="col-span-2 row-span-1 rounded-[2rem] hover:ring-2 p-6 py-2">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 mt-4 w-full h-full">
        <input v-model="formData.name" type="text" placeholder="Your Name" required class="p-2 rounded-lg border border-gray-300">
        <input v-model="formData.email" type="email" placeholder="Your Email" required class="p-2 rounded-lg border border-gray-300">
        <textarea v-model="formData.message" placeholder="Your Message" required class="p-2 rounded-lg border border-gray-300"></textarea>
        
        <button type="submit" class="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-100">
          Contact Me
        </button>
  
        <p v-if="statusMessage" class="text-black text-center ">{{ statusMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const formData = ref({ name: '', email: '', message: '' });
      const statusMessage = ref('');
  
      const handleSubmit = async () => {
        statusMessage.value = 'Sending...';
  
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData.value),
          });
  
          if (response.ok) {
            statusMessage.value = 'Message sent successfully!';
            formData.value = { name: '', email: '', message: '' };
          } else {
            statusMessage.value = 'Failed to send message.';
          }
        } catch (error) {
          statusMessage.value = 'Error sending message.';
        }
      };
  
      return { formData, handleSubmit, statusMessage };
    }
  };
  </script>
  
  <style scoped>
  input, textarea {
    width: 100%;
  }
  </style>