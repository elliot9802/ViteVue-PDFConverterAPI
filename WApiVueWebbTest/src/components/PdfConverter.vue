<template>
    <div>
        <h2>Convert URL to PDF</h2>
        <form @submit.prevent="convertUrl">
            <input v-model="url" name="urlInput" placeholder="Enter URL" />
            <button type="submit" :disabled="isLoading">Convert</button>
        </form>

        <h2>Convert HTML File to PDF</h2>
        <form @submit.prevent="convertHtml">
            <input type="file" name="htmlFileInput" @change="handleFileUpload" />
            <button type="submit" :disabled="isLoading">Convert</button>
        </form>
    </div>
    <div v-if="isLoading">Loading...</div>
</template>


<script>
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export default {
    data() {
        return {
            url: '',
            htmlFile: null,
            isLoading: false
        };
    },
    methods: {
        async convertUrl() {
            if (!this.url) {
                console.error("Please provide a valid URL.");
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
            if (!this.htmlFile) {
                console.error("Please provide a valid HTML file.");
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
