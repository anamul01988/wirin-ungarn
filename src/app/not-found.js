import DialogContent from "@/components/_components/DialogContent";

export default function Custom404() {
  return (
    <DialogContent
      content="<div style='text-align:center'><img src='/assets/404-page-not-found.jpg' alt='404 - Page Not Found' style='max-width:100%;margin:auto;'/></div>"
      imageFeature={null}
      imageAlt="404 - Page Not Found"
    />
  );
}
