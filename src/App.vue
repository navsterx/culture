<template>
  <router-view />
</template>

<script setup>
import { inject } from '@vercel/analytics';
inject();
</script>
