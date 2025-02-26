import React, { useRef, useState } from 'react';

function BrokenForm() {
  function handleSubmit(e) {
    e.preventDefault();
    // ???
    console.log(e);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button>Submit</button>
    </form>
  );
}

function NameForm() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(value);
  }

  console.log('Value:', value);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange} />
      <button>Senda</button>
    </form>
  );
}

function EssayForm() {
  const [value, setValue] = useState('Please write an essay about your favorite DOM element.');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`An essay was submitted: ${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Essay:
        <textarea value={value} onChange={handleChange} />
      </label>
      <button>Submit</button>
    </form>
  );
}

function FlavorForm() {
  const [value, setValue] = useState('coconut');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your favorite flavor is: ${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick your favorite La Croix flavor:
        <select value={value} onChange={handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <button>Submit</button>
    </form>
  );
}

function Reservation() {
  const [data, setData] = useState({
    isGoing: true,
    numberOfGuests: 2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isGoing, numberOfGuests } = data;

    alert(`Going? ${isGoing}.`);

    if (isGoing) {
      alert(`Number of guests: ${numberOfGuests}`);
    }
  }

  const handleInputChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // Hermum eftir partial state update með object spread
    setData(prevState => ({
      ...prevState,
      ...{[name]: value}
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={data.isGoing}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={data.numberOfGuests}
          onChange={handleInputChange} />
      </label>
      <button>Submit</button>
    </form>
  );
}

function UncontrolledFormRef() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${inputRef.current.value}`);
  }

  // Ef við setjum value í stað defaultValue að neðan munum við fá keyrslu
  // warning frá react um að við séum að blanda saman controlled og uncontrolled
  return (
    <form onSubmit={handleSubmit}>
      <input
        defaultValue="Bob"
        type="text"
        ref={inputRef} />
      <button>Submit</button>
    </form>
  );
}

// Ef það eru margir reitir munum við þurfa mörg useRef, þá er líka hægt að nota
// gömlu góðu DOM aðgerðirnar
function UncontrolledFormDom() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs =
      Array
        .from(e.target.querySelectorAll('input'))
        .map((input) => `${input.name} = ${input.value}`);

    alert(inputs.join(', '));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nafn: <input name="name" type="text" /></label>
      <label>Heimilisfang: <input name="address" type="text" /></label>
      <label>Símanúmer: <input name="phonenumber" type="text" /></label>
      <button>Submit</button>
    </form>
  );
}

function FileForm() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`File = ${inputRef.current.files[0].name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      File:
      <input
        type="file"
        ref={inputRef}
        />
      <button type="submit">Submit</button>
    </form>
  );
}

// Gott að henda/commenta út hverju Formi til að
// skoða virkni
export default function App() {
  return (
    <div>
      <BrokenForm />
      <hr />
      <NameForm />
      <hr />
      <EssayForm />
      <hr />
      <FlavorForm />
      <hr />
      <Reservation />
      <hr />
      <UncontrolledFormRef />
      <hr />
      <UncontrolledFormDom />
      <hr />
      <FileForm />
    </div>
  );
}
