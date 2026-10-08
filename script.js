async function analyzeWebsite() {

    const url = document.getElementById("websiteUrl").value.trim();
    const result = document.getElementById("result");

    if (url === "") {
        alert("Please enter a website URL.");
        return;
    }

    result.innerHTML = `
        <h2>🔍 Scanning...</h2>
        <p>Analyzing website and generating AI recommendations...</p>
    `;

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/analyze",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: url
                })
            }
        );

        const data = await response.json();

        // URL / backend error
        if (!response.ok || data.error) {

            result.innerHTML = `
                <h2>❌ URL Verification Failed</h2>

                <p>
                    <strong>URL:</strong>
                    ${url}
                </p>

                <p>
                    <strong>URL Status:</strong>
                    ${data.url_status || "Could Not Be Verified"}
                </p>

                <p>
                    ${data.error || "Analysis failed."}
                </p>
            `;

            return;
        }

        // Successful analysis
        result.innerHTML = `
            <h2>✅ Analysis Completed</h2>

            <p>
                <strong>Website:</strong>
                ${data.url}
            </p>

            <p>
                <strong>URL Status:</strong>
                ${data.url_status}
            </p>

            <hr>

            <p>
                <strong>Total Images:</strong>
                ${data.total_images}
            </p>

            <p>
                <strong>Images Without Alt Text:</strong>
                ${data.images_without_alt}
            </p>

            <p>
                <strong>Headings Found:</strong>
                ${data.headings}
            </p>

            <p>
                <strong>Inputs Without Labels:</strong>
                ${data.inputs_without_labels}
            </p>

            <p>
                <strong>Total Links:</strong>
                ${data.total_links}
            </p>

            <p>
                <strong>Links Without Text:</strong>
                ${data.links_without_text}
            </p>

            <p>
                <strong>Semantic HTML Elements:</strong>
                ${data.semantic_elements}
            </p>

            <p>
                <strong>Accessibility Score:</strong>
                ${data.accessibility_score}/100
            </p>

            <p>
                <strong>Overall Status:</strong>
                ${data.overall_severity}
            </p>

            <hr>

            <h2>🤖 AI Recommendations</h2>

            <div style="
                background:#f8fafc;
                padding:20px;
                border-radius:10px;
                line-height:1.7;
                white-space:normal;
            ">
                ${
                    data.ai_suggestions
                    ? data.ai_suggestions.replace(/\n/g, "<br>")
                    : "AI recommendations are not available."
                }
            </div>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <h2>❌ Connection Error</h2>

            <p>
                Could not connect to the AccessAI backend.
            </p>

            <p>
                Please make sure Flask is running.
            </p>
        `;
    }
}