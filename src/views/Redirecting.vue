<template>
  <div class="redirect-container">
    <div class="redirect-box">
      <div class="spinner"></div>
      <p>Redirecting, please wait...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const code = route.query.code;

  if (!code) {
    router.push('/login');
    return;
  }

  try {
    const response = await fetch(`https://your-backend.com/api/auth/google/callback?code=${code}`, {
      method: 'GET',
    });

    if (!response.ok) throw new Error('Failed to fetch login payload');

    const payload = await response.json();

    if (!payload.token || !payload.user) {
      throw new Error('Invalid payload from backend');
    }

    // Save data to localStorage
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user_id', payload.user.id);

    if (payload.user.role) {
      localStorage.setItem('user_role', payload.user.role);
      localStorage.removeItem('onboarding_in_progress');
    } else {
      localStorage.setItem('onboarding_in_progress', 'true');
    }

    const redirectPath = payload.redirect || '/login';
    router.push(redirectPath);

  } catch (err) {
    console.error('OAuth callback failed:', err);
    router.push('/login');
  }
});
</script>




<style scoped>
.redirect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
}

.redirect-box {
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.spinner {
  border: 4px solid #e5e7eb;
  border-top: 4px solid #045d56;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
