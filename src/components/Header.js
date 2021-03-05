import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='green' text='Hello' />
            <Button color='green' text='Hello 23' />
            <Button color='green' text='Hello 21' />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}

Header.propTypes = {
    title : PropTypes.string.isRequired,
}
// CSS IN JS
// const headerStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }


export default Header
