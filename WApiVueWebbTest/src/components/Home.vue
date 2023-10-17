<template>
    <div>
        <!-- Navigation Bar -->
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <!-- Add more links here if needed -->
            </ul>
        </nav>

        <!-- Main Content -->
        <section>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of your Vue application. Customize it to fit your needs.</p>
        </section>
    </div>
</template>
  
<script>
export default {
    name: 'Home'
};
</script>
  
<style scoped>
/* You can add your CSS styling here */
nav {
    background-color: #f8f9fa;
    padding: 1rem;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav li {
    display: inline;
    margin-right: 1rem;
}

nav a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

nav a:hover {
    text-decoration: underline;
}

section {
    padding: 2rem;
}
</style>
  