<template>
  <div class="first-pane__wrapper">
    <nav>
      <ul style="gap: 10px">
        <li v-for="menuItem in menuItems" :key="menuItem.path">
          <a :href="menuItem.path">
            <component :is="menuItem.icon" />
            {{ menuItem.name }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import {
  Home,
  User,
  MessageSquare,
  Settings,
  Bell,
  CheckSquare,
  BarChart2,
  Users,
  Briefcase,
  FileText,
  LifeBuoy,
  HelpCircle,
  File,
  Shield,
  Mail,
  LogOut,
} from "lucide-vue-next";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Analytics", path: "/analytics", icon: BarChart2 },
  { name: "Users", path: "/users", icon: Users },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Support", path: "/support", icon: LifeBuoy },
  { name: "FAQ", path: "/faq", icon: HelpCircle },
  { name: "Terms", path: "/terms", icon: File },
  { name: "Privacy", path: "/privacy", icon: Shield },
  { name: "Feedback", path: "/feedback", icon: Mail },
  { name: "Logout", path: "/logout", icon: LogOut },
];
</script>
<style lang="scss">
.first-pane {
  &__wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px;
    a {
      padding: 4px 8px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      border-radius: 6px;
      flex: 1;
      &:hover {
        background-color: rgba(white, 0.1);
      }
    }
  }
}
</style>
