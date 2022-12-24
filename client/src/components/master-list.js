const MasterListItem = (props) => {
    console.log('masterList', props);
    const {id, name, rating} = props.value;
    return (
    <div>     
      <label>{name}, rating - {rating}</label>
      <input id={id} type='radio' value={name} name='masters' />
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