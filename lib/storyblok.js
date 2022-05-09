import StoryblokClient from "storyblok-js-client";

export const Storyblok = new StoryblokClient({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    cache: {
        clear: "auto",
        type: "memory",
    },
});

