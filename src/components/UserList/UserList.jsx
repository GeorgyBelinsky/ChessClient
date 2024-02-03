import "./index.css";

const UserList = ({ users }) => {

    const getColor = (userRole) => {
        if (userRole === 'white') {
            return { textDecoration: 'underline', textDecorationColor: 'white', paddingLeft: "10px" };
        } else if (userRole === 'black') {
            return { textDecoration: 'underline', textDecorationColor: 'black', paddingLeft: "10px" };
        } else {
            return { textDecoration: 'underline', textDecorationColor: 'grey', paddingLeft: "10px" };
        }
    };

    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < users.length; i += 2) {
            const user1 = users[i];
            const user2 = i + 1 < users.length ? users[i + 1] : null;

            rows.push(
                <tr className="users_row" key={i}>
                    <td style={getColor(user1.userRole)}>{user1.userName}</td>
                    {user2 && (
                        <>
                            <td style={getColor(user2.userRole)}>{user2.userName}</td>
                        </>
                    )}
                </tr>
            );
        };
        return rows;
    };

    return <table className="user_list">
        <thead className="user_lable">
            <tr><td>Connected Users</td></tr>
        </thead>
        <tbody className="lists_container">
            {renderRows()}
        </tbody>
    </table>

    /*             <div className="left_list">
                {users.slice(0, Math.ceil(users.length / 2)).map((user, index) => (
                    <h5 className="user" key={index} style={{ color: getColor(user.userRole) }}>{user.userName}</h5>
                ))}
            </div>  

            <div className="right_list">
                {users.slice(Math.ceil(users.length / 2)).map((user, index) => (
                    <h5 className="user" key={index} style={{ color: getColor(user.userRole) }}>{user.userName}</h5>
                ))}
            </div> 

                    users.map((user, index) => (
                        <td className="user" key={index} style={{ color: getColor(user.userRole) }}>
                            {user.userName}</td>
                    ))
                */

}

export default UserList;