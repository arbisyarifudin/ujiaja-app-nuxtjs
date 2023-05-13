export default function objectToFormData(form) {
  const formData = new FormData();

  for (const formKey in form) {
    if (form.hasOwnProperty(formKey)) {
      const formObj = form[formKey];

      for (const key in formObj) {
        if (formObj[key] instanceof File) {
          formData.append(`${formKey}[${key}]`, formObj[key])
        } else if (formObj[key] instanceof Object && !Array.isArray(formObj[key])) {
          for (const masterKey in formObj[key]) {
            if (formObj[key].hasOwnProperty(masterKey)) {
              formData.append(`${formKey}[${key}][${masterKey}]`, formObj[key][masterKey]);
            }
          }
        } else if (Array.isArray(formObj[key])) {
          for (let i = 0; i < formObj[key].length; i++) {
            const featureObj = formObj[key][i];

            for (const featureKey in featureObj) {
              if (featureObj.hasOwnProperty(featureKey)) {
                formData.append(`${formKey}[${key}][${i}][${featureKey}]`, featureObj[featureKey]);
              }
            }
          }
        } else {
          formData.append(`${formKey}[${key}]`, formObj[key])
        }
      }
    }
  }
  return formData;
}