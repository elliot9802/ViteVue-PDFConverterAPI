<template>
    <div class="container">
        <!-- Navigation Bar -->

        <!-- Main Content -->
        <section>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of your Vue application. Customize it to fit your needs.</p>
            <router-link to="/pdf-converter">Go to PDF Converter</router-link>
        </section>
    </div>
</template>
  
<script>
export default {
    name: 'homesS'
};
</script>
  
<style scoped>
/* General styles */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f6f9fc;
    margin: 0;
    padding: 0;
    line-height: 1.6;
}


/* Main Content styles */
section {
    padding: 2rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 2rem;
    color: #333;
    margin-top: 0;
}

p {
    color: #666;
}
</style>
