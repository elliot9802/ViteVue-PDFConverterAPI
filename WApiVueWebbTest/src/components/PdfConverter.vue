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
        <div v-if="isLoading" class="loading-indicator">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
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
            error: null,
            progress: 0
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
                        headers: { 'Content-Type': 'application/json' },
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            this.progress = percentCompleted;
                        }
                    }
                );

                this._downloadBlob(response.data, 'file.pdf');

            } catch (error) {
                console.error("Error converting URL to PDF:", error);
                this.error = "Failed to convert URL to PDF: API is not fully implemented yet";
                if (error.response && error.response.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        console.error("Server responded with:", this.result);
                    };
                    reader.readAsText(error.response.data);
                }
            } finally {
                this.isLoading = false;
                this.progress = 0;
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
                this.error = 'Failed to convert HTML to PDF: API is not fully implemented yet';
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
$primary-color: #F7F7F7;
$button-color: #E76F51;
$label-color: #f7f7f7b6;
$error-color: #e74c3c;
$light-bg-color: #f6f9fc;
$text-color: #0A3D62;
$text-color-light: #5A5A5A;
$border-color: #ccc;
$hover-opacity: 0.8;
$box-shadow-light: 0 0 15px rgba(0, 0, 0, 0.1);
$box-shadow-tiny: 0 0 5px rgba(0, 0, 0, 0.1);
$disabled-bg-color: #bdc3c7;

.pdf-converter-container {
    // width: 100%;
    // max-width: 600px;
    // margin: 50px auto;
    // padding: 30px;
    // box-shadow: $box-shadow-light;
    // border-radius: 10px;
    // background-color: $light-bg-color;
    padding: 2rem;
    background-color: $primary-color;
    /* Light gray background for contrast */
    border: 1px solid #e0e0e0;
    /* Subtle border */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Soft shadow */
    border-radius: 5px;
    /* Rounded corners */
    max-width: 600px;
    /* Optional: setting a maximum width can make it look better on wide screens */
    margin: 2rem auto;
    /* Centering the converter on the page */

    a {
        margin: 0;
        width: 100%;
        color: #2a9d5e;
        text-decoration: none;
    }

}

h2 {
    margin: 10px auto;
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



    .input-group {
        position: relative;

        .input-field {
            padding: 10px 15px;
            border: 1px solid $border-color;
            border-radius: 5px;
            color: grey;
            font-size: 14px;
            width: 100%;
            background-color: $label-color;
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
}

.convert-button {
    padding: 10px 20px;
    background-color: $button-color;
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-indicator {
    text-align: center;

    .spinner {
        background-color: $light-bg-color;
        border: 4px solid $primary-color;
        border-top: 4px solid #D3D3D3; // this is the color of the spinning part of the loader
        padding: 10px;
        border-radius: 50%; // make it circular
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite; // add spinning animation
        margin: 20px auto; // center it horizontally
        box-shadow: $box-shadow-tiny;
    }
}

.progress-bar {
    width: 100%;
    height: 20px; // or your desired height
    background-color: #e0e0e0; // a light background
    border-radius: 10px;
    overflow: hidden; // ensures inner content doesn't spill out
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, $primary-color, $light-bg-color); // Gradient from primary color to light background color
}



.error-message {
    color: $error-color;
    background-color: #ffe6e6;
    padding: 10px;
    border-radius: 5px;
}
</style>