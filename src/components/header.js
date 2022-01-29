import PropTypes from 'prop-types'
import Button from './button'
import {useLocation} from 'react-router-dom'
const Header = ({title , onToggle , showAddTask}) => {

    const location = useLocation();

    return ( <header className="header">
        <h1>{title}</h1>
        {location.pathname==="/" && (<Button color={showAddTask ? "red" : "green"} text={showAddTask ? "Close" : "Add"} onClick={onToggle}/>)}
    </header> );
}

Header.defaultProps = {
    title : "Task Tracker"
};

Header.propTypes = {
    title : PropTypes.string.isRequired
}

export default Header;