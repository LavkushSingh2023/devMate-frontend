

const UserCard = ({user}) => {
    const {firstName, lastName, Age, gender} = user
    return(
        <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-center">            
                <button className="btn btn-primary">Ignored</button>
                <button className="btn btn-secondary">Interested</button>                  
            </div>
        </div>
        </div>
    )
}

export default UserCard