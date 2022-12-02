import React from "react";
import { CallToAcion } from "../components/CallToAcion";

const NotFoundPage = () => {
    return (
        <div className="w-100 h-75 text-center bg-grade-blue flex f-column j-evenly align-center">
            <div>
                <h1 className="mb-2">404 - Page Not Found</h1>
                <CallToAcion path="/" legend="Go back to home" />
            </div>
            <img className="img-404" src="/img/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.webp" alt="404 not found" />
        </div>
    );
};

export default NotFoundPage;