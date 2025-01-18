const UserCard = ({user}) => {
    const {firstName, lastName,photoUrl, Age, gender} = user
    return(
        <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
            <img
            src={photoUrl}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName}</h2>
            {Age && gender &&
                <>
                    <p>{Age} years old, {gender}</p>
                </>            
            }
            <p>This is default about this page if you want to add can add!</p>
            <div className="card-actions justify-center">            
                <button className="btn btn-primary">Ignored</button>
                <button className="btn btn-secondary">Interested</button>                  
            </div>
        </div>
        </div>
    )
}

export default UserCard