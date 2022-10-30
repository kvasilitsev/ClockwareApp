const MasterListItem = (props) => {
    const {id, name, rating} = props.value;
    return (
    <div>     
      <label>{name}, rating - {rating}</label>
      <input type='radio' value={id} name='masters' />
    </div>
    );
  }

const MasterList = (props) => {    
    const masters = props.masters;
    return (
      <div>
        {masters.map((master) =>
          <MasterListItem key={master.id.toString()}
                          value={master} />
        )}
      </div>
    );
  }

export default MasterList;