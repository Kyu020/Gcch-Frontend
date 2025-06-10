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
  console.log('🔍 Redirecting component mounted');
  console.log('🔍 Current URL:', window.location.href);
  console.log('🔍 Hash:', window.location.hash);
  console.log('🔍 Search:', window.location.search);

  const params = new URLSearchParams(window.location.search);
  const payloadRaw = params.get('payload');

  console.log('🔍 Raw payload from URL:', payloadRaw);

  if (!payloadRaw) {
    console.log('❌ No payload found - this is why it redirects to login');
    console.log('🔍 Available URL params:', Array.from(params.entries()));
    alert('No payload found! Check console for URL details');
    router.push('/login');
    return;
  }

  let payload;
  try {
    payload = JSON.parse(payloadRaw);
    console.log('✅ Payload parsed successfully:', payload);
  } catch (e) {
    console.error("❌ Invalid payload:", e);
    alert('Invalid payload: ' + e.message);
    router.push('/login');
    return;
  }

  if (!payload || !payload.user || !payload.user.id) {
    console.error("❌ Missing user info in payload:", payload);
    alert('Missing user info in payload');
    router.push('/login');
    return;
  }

  console.log('✅ All validations passed, storing data...');

  // Store token and user info
  if (payload.token) localStorage.setItem('token', payload.token);
  localStorage.setItem('user_id', payload.user.id);

  if (payload.user.role) {
    localStorage.setItem('user_role', payload.user.role);
    localStorage.removeItem('onboarding_in_progress');
  } else {
    localStorage.setItem('onboarding_in_progress', 'true');
  }

  console.log('✅ Data stored, waiting 1 second...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  const redirectPath = (payload.redirect || '/login').replace(/\\/g, '');
  console.log('✅ Redirecting to:', redirectPath);
  router.push(redirectPath);
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
