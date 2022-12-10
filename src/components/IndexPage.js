import React from 'react';
import FilterForm from "./FilterForm";
import {Card} from "react-bootstrap";

class IndexPage extends React.Component {
    render() {
        return (
            <html lang="en">
            <body>
            <div className="mainInterface">
                <div>
                    <Card>
                        <FilterForm/>
                    </Card>
                </div>
            </div>
            </body>
            </html>
        );
    }
}

export default IndexPage;