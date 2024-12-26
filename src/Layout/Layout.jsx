import PropTypes from 'prop-types';
import '../App.css';

const Layout = ({ children }) => {
    return <div className="content-container">{children}</div>;
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
