function Card(props) {
    return (
        <div className="project-content">
            <h3 className="project-title">{props.title}</h3>
            <p className="project-desc">{props.description}</p>
        </div>
    );
}

export default Card;