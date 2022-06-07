<script setup lang="ts">
import * as tus from "tus-js-client";

definePageMeta({
  layout: "container-fluid",
  title: "nuxt-cloudflare-tus-upload"
});

const file = ref<HTMLInputElement>(null);
const percentage = ref<string>("");
const total = ref<number>(null);
const uploaded = ref<number>(null);

const onUpload = async () => {
  const upload = new tus.Upload(file.value.files[0], {
    endpoint: "/api/createUpload",
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
        filename: file.value.files[0].name,
        filetype: file.value.files[0].type
    },
    onError: function(error) {
        console.log("Failed because: " + error)
    },
    onProgress: function(bytesUploaded, bytesTotal) {
      percentage.value = (bytesUploaded / bytesTotal * 100).toFixed(2) + "%";
      total.value = bytesTotal;
      uploaded.value = bytesUploaded;

    },
    onSuccess: function() {
        console.log("Download %s from %s", upload.file.name, upload.url)
    }
  });
  upload.start();
}
</script>

<template>
  <div>
    <input ref="file" type="file" v-on:change="onUpload()">
    <hr />
    {{ percentage }}<br />
    {{ uploaded }} / {{ total }}
  </div>
</template>
