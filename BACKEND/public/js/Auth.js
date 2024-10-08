document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    try {
      const response = await fetch(this.action, {
        method: this.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });
      if (response.ok) {
        const data = await response.json();
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });
