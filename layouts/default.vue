<template>
  <div id="appRoot">
    <nuxt />
  </div>
</template>

<script>
  export default {
      head() {
          return {
              title: this.title,
          };
      },
      data: () => ({
          title: process.env.APP_NAME_SHOW,
      }),
  }
</script>
