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
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  // Clean the URL: get query string and remove hash fragments like #/login
  const fullUrl = window.location.href;
  const queryString = fullUrl.includes('?') ? fullUrl.split('?')[1] : '';
  const cleanQuery = queryString.split('#')[0];
  const params = new URLSearchParams(cleanQuery);

  const payloadRaw = params.get('payload');

  
  if (!payloadRaw) {
    console.warn('No payload found in URL query params, redirecting to login.');
    router.push('/login');
    return;
  }


  let payload = {};
  try {
    payload = JSON.parse(payloadRaw);
  } catch (e) {
    router.push('/login');
    return;
  }

  if (!payload.user.role) {
    localStorage.setItem('onboarding_in_progress', 'true');
  }

  if (payload.token) localStorage.setItem('token', payload.token);
  if (payload.user && payload.user.id) {
    localStorage.setItem('user_id', payload.user.id);

    if (payload.user.role) {
      localStorage.setItem('user_role', payload.user.role);
      localStorage.removeItem('onboarding_in_progress');
    } else {
      localStorage.setItem('onboarding_in_progress', 'true');
    }
  }

  console.log('Payload:', payload);
  console.log('Redirect:', payload.redirect);

  await new Promise(resolve => setTimeout(resolve, 1000));
  router.push(payload.redirect || '/login');
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
