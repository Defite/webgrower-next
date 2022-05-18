import React from "react";
import {Header} from "../Header";
import {Footer} from "../Footer";
import {StoryblokTag} from '../CategorySelect/CategorySelect.types';

interface DefaultLayoutProps {
    children: React.ReactNode,
    selectOptions: Array<StoryblokTag>
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({children, selectOptions}) => {
    return (
        <>
            <Header tags={selectOptions} />
            <main>{children}</main>
            <Footer/>
        </>
    )
}

export default DefaultLayout;