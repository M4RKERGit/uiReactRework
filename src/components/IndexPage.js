import React from 'react';
import FilterForm from "./FilterForm";

class IndexPage extends React.Component {
    render() {
        return (
            <div className="mainInterface">
                <div>
                    <FilterForm/>
                </div>
            </div>
        );
    }
}

export default IndexPage;