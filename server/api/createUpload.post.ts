import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const response = await $fetch.raw(
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream?direct_user=true",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer $TOKEN",
        "Tus-Resumable": "1.0.0",
        "Upload-Length": event.req.headers["upload-length"] as string
        // "Upload-Metadata": request.headers.get("Upload-Metadata")
      }
    }
  );
  const destination = response.headers.get("location");
  event.res.setHeader("Access-Control-Expose-Headers", "Location");
  event.res.setHeader("Access-Control-Allow-Headers", "*");
  event.res.setHeader("Access-Control-Allow-Origin", "*");
  event.res.setHeader("Location", destination);

  return true;
});
