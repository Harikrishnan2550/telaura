"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

const BREVO_ACTION =
  "https://2d71e083.sibforms.com/serve/MUIFAEYC2rX6oH-ijq4KG0eG8k8Fcw9SjjJpsy549xMRm2ASzPY8BnQDp_KS3-_Y5e05nl8DYj6FCBgbmhidoeR8RxpqmfplaQh50ElhmB0T0Bh-zUp0VbfxrhW9Kach-M8LB-nMeQN3FOyVjW1HwO4HXiSDf1f-aUyGnCmZV06wzCpCG9LItgQHSXYx6rW2MHVA_JuBrqgMyvJY";

const BrevoHiddenForm = forwardRef(function BrevoHiddenForm(_, ref) {
  const formRef = useRef(null);

  useImperativeHandle(ref, () => ({
    submit(data) {
      if (!formRef.current) return false;

      formRef.current.FIRSTNAME.value = data.name || "";
      formRef.current.EMAIL.value = data.email || "";
      formRef.current.PHONE.value = data.phone || "";
      formRef.current.JOB_TITLE.value = data.message || "";

      // ✅ submit into iframe (no redirect)
      formRef.current.submit();
      return true;
    },
  }));

  return (
    <>
      {/* ✅ hidden iframe to stop redirect */}
      <iframe
        name="brevo_iframe"
        title="brevo_iframe"
        style={{ display: "none" }}
      />

      <form
        ref={formRef}
        method="POST"
        action={BREVO_ACTION}
        target="brevo_iframe" // ✅ this prevents redirect
        style={{ display: "none" }}
      >
        <input type="text" name="FIRSTNAME" />
        <input type="text" name="EMAIL" />
        <input type="text" name="PHONE" />
        <input type="text" name="JOB_TITLE" />

        {/* Required hidden fields */}
        <input type="text" name="email_address_check" defaultValue="" />
        <input type="hidden" name="locale" defaultValue="en" />
      </form>
    </>
  );
});

export default BrevoHiddenForm;
