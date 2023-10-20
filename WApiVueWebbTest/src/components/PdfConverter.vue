<template>
    <div class="pdf-converter-container">

        <!-- Overview -->
        <h2>WebApiPdfConverter Live Demo</h2>
        <p>Welcome to the WebApiPdfConverter demo. Here you can easily test the API's capabilities by converting a URL or an
            HTML file to PDF.</p>
        <a href="#översikt" target="_blank">API Overview</a>

        <!-- Convert URL to PDF Section -->
        <h2>Convert URL to PDF</h2>
        <form @submit.prevent="convertUrl" class="converter-form">
            <div class="input-group">
                <input v-model="url" name="urlInput" placeholder="Enter URL" class="input-field" />
                <span class="help-icon"
                    title="Enter the complete web address you want to convert. e.g., http://example.com">?</span>
            </div>
            <button type="submit" :disabled="isLoading" class="convert-button">Convert</button>
            <a href="#konvertera-url-till-pdf" target="_blank">See API Guide for URL to PDF</a>
        </form>

        <!-- Convert HTML File to PDF Section -->
        <h2>Convert HTML File to PDF</h2>
        <form @submit.prevent="convertHtml" class="converter-form">
            <div class="input-group">
                <input type="file" name="htmlFileInput" @change="handleFileUpload" class="input-field" />
                <span class="help-icon" title="Upload the HTML file you want to convert.">?</span>
            </div>
            <button type="submit" :disabled="isLoading" class="convert-button">Convert</button>
            <a href="#konvertera-html-fil-till-pdf" target="_blank">See API Guide for HTML to PDF</a>
        </form>

        <!-- Loading and Errors -->
        <div v-if="isLoading" class="loading-indicator">Loading...</div>
        <div v-if="error" class="error-message">{{ error }}</div>

    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export default {
    data() {
        return {
            url: '',
            htmlFile: null,
            isLoading: false,
            error: null
        };
    },
    methods: {
        async convertUrl() {
            this.error = null;
            if (!this.url) {
                this.error = "Please provide a valid URL.";
                return;
            }
            this.isLoading = true;
            try {

                const response = await axios.post(
                    `${apiUrl}/convertUrl`,
                    { url: this.url },
                    {
                        responseType: 'blob',
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                this._downloadBlob(response.data, 'file.pdf');

            } catch (error) {
                console.error("Error converting URL to PDF:", error);
                this.error = "Failed to convert URL to PDF:";
                if (error.response && error.response.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        console.error("Server responded with:", this.result);
                    };
                    reader.readAsText(error.response.data);
                }
            } finally {
                this.isLoading = false;
            }
        },

        async convertHtml() {
            this.error = null;
            if (!this.htmlFile) {
                this.error = "Please provide a valid HTML file.";
                return;
            }
            this.isLoading = true;
            try {
                const formData = new FormData();
                formData.append('htmlFile', this.htmlFile);

                const response = await axios.post(
                    `${apiUrl}/convertHtmlFile`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        responseType: 'blob'
                    }
                );

                this._downloadBlob(response.data, 'converted.pdf');

            } catch (error) {
                console.error('Error converting HTML to PDF:', error);
                this.error = 'Failed to convert HTML to PDF:';
            } finally {
                this.isLoading = false;
            }
        },

        handleFileUpload(event) {
            this.htmlFile = event.target.files[0];
        },

        _downloadBlob(blobData, filename) {
            const blob = new Blob([blobData], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }
    }
};
</script>

<style lang="scss" scoped>
$primary-color: #3498db;
$error-color: #e74c3c;
$light-bg-color: #f6f9fc;
$text-color: #2f3b52;
$text-color-light: #2f3b52b4;
$border-color: #ccc;
$hover-opacity: 0.8;
$box-shadow-light: 0 0 15px rgba(0, 0, 0, 0.1);
$box-shadow-tiny: 0 0 5px rgba(0, 0, 0, 0.1);
$disabled-bg-color: #bdc3c7;

.pdf-converter-container {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    box-shadow: $box-shadow-light;
    border-radius: 10px;
    background-color: $light-bg-color;
}

h2 {
    margin: 50px auto;
    color: $text-color;
    font-weight: 500;
}

p {
    color: $text-color-light;
    margin-bottom: 10px;
}

.api-link {
    margin: 10px 0;
}

.converter-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
}

.input-group {
    position: relative;

    .input-field {
        padding: 10px 15px;
        border: 1px solid $border-color;
        border-radius: 5px;
        color: grey;
        font-size: 14px;
        width: 100%;
    }

    .help-icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background-color: $primary-color;
        color: #fff;
        border-radius: 50%;
        padding: 5px;
        width: 20px;
        height: 20px;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            opacity: $hover-opacity;
        }
    }
}

.convert-button {
    padding: 10px 20px;
    background-color: $primary-color;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;

    &:hover {
        opacity: $hover-opacity;
    }

    &:disabled {
        background-color: $disabled-bg-color;
        cursor: not-allowed;
    }
}

.loading-indicator {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #ffeb3b;
    padding: 5px 10px;
    border-radius: 3px;
    box-shadow: $box-shadow-tiny;
}

.error-message {
    color: $error-color;
    background-color: #ffe6e6;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
}
</style>