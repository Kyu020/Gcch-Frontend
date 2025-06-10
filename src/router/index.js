import { createRouter, createWebHashHistory } from "vue-router";
import axios from "axios"; 
import Loginpage from "@/views/Loginpage.vue";
import Signup from "@/views/Signup.vue";
import CompanyDashboard from "@/views/CompanyDashboard.vue";
import CompanyPost from "@/views/CompanyPost.vue";
import CompanyAccepted from "@/views/CompanyAccepted.vue";
import CompanyMessage from "@/views/CompanyMessage.vue";
import CompanyProfile from "@/views/CompanyProfile.vue";
import Applicantdash from "@/views/Applicantdash.vue";
import Applicantmessage from "@/views/Applicantmessage.vue";
import Applicantprofile from "@/views/Applicantprofile.vue";
import Application from "@/views/Application.vue";
import Redirecting from "@/views/Redirecting.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Loginpage,
    },

    {
      path: `/signup/:userId`,
      name: "Signup",
      component: Signup,
    },

    {
      path: "/companydash",
      name: "CompanyDash",
      component: CompanyDashboard,
    },

    {
      path: "/companypost",
      name: "CompanyPost",
      component: CompanyPost,
    },

    {
      path: "/companymessage",
      name: "CompanyMessage",
      component: CompanyMessage,
    },

    {
      path: "/companyaccepted",
      name: "CompanyAccepted",
      component: CompanyAccepted,
    },
    {
      path: "/companyprofile",
      name: "CompanyProfile",
      component: CompanyProfile,
    },

    {
      path: "/applicantdash",
      name: "ApplicantDash",
      component: Applicantdash,
    },

    {
      path: "/applicantmessage",
      name: "ApplicantMessage",
      component: Applicantmessage,
    },

    {
      path: "/applicantprofile",
      name: "ApplicantProfile",
      component: Applicantprofile,
    },
    
    {
      path: "/application",
      name: "Application",
      component: Application,
    },

    {
      path: "/redirecting",
      name: "Redirecting",
      component: Redirecting,
    }
  ],
});

// router.beforeEach(async (to, from, next) => {
//   if (to.name === 'Redirecting') {
//     return next(); // 🚨 Always allow Redirecting page to run — it handles login setup
//   }

//   const userId = localStorage.getItem('user_id');
//   const role = localStorage.getItem('user_role');
//   const onboarding = localStorage.getItem('onboarding_in_progress') === 'true';

//   const publicPages = ['Login', 'Signup', 'Redirecting'];
//   const authRequired = !publicPages.includes(to.name);

//   // ✅ Always allow access to public pages, especially Redirecting
//   if (!authRequired) {
//     return next();
//   }

//   // ✅ If not logged in and trying to access a protected page, redirect to login
//   if (!userId) {
//     return next({ name: 'Login' });
//   }

//   // ✅ If logged in and trying to go back to public pages like Login/Signup
//   if (userId && publicPages.includes(to.name)) {
//     if (onboarding || !role) {
//       return next(); // allow to proceed to Signup
//     }

//     const fallback = role === 'company' ? 'CompanyDash' : 'ApplicantDash';
//     return next({ name: fallback });
//   }

//   // ✅ If role is missing, try to fetch it
//   if (!role && !onboarding) {
//     try {
//       const { data } = await axios.get(`/user/${userId}`);
//       localStorage.setItem('user_role', data.role);
//     } catch (error) {
//       console.error('Failed to fetch user role:', error);
//       return next({ name: 'Login' });
//     }
//   }

//   const updatedRole = localStorage.getItem('user_role');

//   const companyOnlyRoutes = ['CompanyDash', 'CompanyPost', 'CompanyMessage', 'CompanyAccepted', 'CompanyProfile'];
//   const applicantOnlyRoutes = ['ApplicantDash', 'ApplicantMessage', 'ApplicantProfile', 'Application'];

//   const fallback = from.name || localStorage.getItem('last_valid_route') || 'Login';

//   if (companyOnlyRoutes.includes(to.name) && updatedRole !== 'company') {
//     return next({ name: fallback });
//   }

//   if (applicantOnlyRoutes.includes(to.name) && updatedRole !== 'applicant') {
//     return next({ name: fallback });
//   }

//   return next();
// });

// router.afterEach((to) => {
//   const publicPages = ['Login', 'Signup', 'Redirecting'];
//   if (!publicPages.includes(to.name)) {
//     localStorage.setItem('last_valid_route', to.name);
//   }
// });

export default router;
