import Page from "./Page";

const components = {
    page: Page,
};

const DynamicComponent = ({ blok }) => {
    // check if component is defined above
    if (typeof components[blok.component] !== "undefined") {
        const Component = components[blok.component];

        return <Component blok={blok} key={blok._uid} />;
    }

    // fallback if the component doesn't exist
    return (
        <p>
            The component <strong>{blok.component}</strong> has not been created yet.
        </p>
    );
};

export default DynamicComponent;