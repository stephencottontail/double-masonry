import { Component } from '@wordpress/element';
import { createElement as el } from '@wordpress/element';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        return el( 'p', {}, 'Hello editor!' );
    }
}

export default DoubleMasonry;
