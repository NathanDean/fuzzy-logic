const React = require("react");

const Turnstile = ({ onSuccess }) => {

    React.useEffect(() => {

        if(onSuccess) onSuccess("mock-turnstile-token")

    }, [onSuccess]);

    return React.createElement("div", {"data-testid": "mock-turnstile"},

        React.createElement("input", {

            type: "hidden",
            name: "cf-turnstile-response",
            value: "mock-turnstile-token"

        })

    )

}

exports.Turnstile = Turnstile;