import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailsEvent() {
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const { contenId } = useParams();
  console.log(formData);

  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  useEffect(() => {
    try {
      const fetchEvent = async () => {
        const res = await fetch(`/api/cont/getcont?ContenId=${contenId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedEvent = data.conts.find(
            (formm) => formm._id === contenId
          );
          if (selectedEvent) {
            setFormData(selectedEvent);
            console.log(selectedEvent);
          }
        }
      };
      fetchEvent();
    } catch (error) {
      console.log(error.message);
    }
  }, [contenId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/feedc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" mt-5 ">
        <div className="max-w-[800px] break-words  font-serif text-5xl text-slate-900 ">
          {formData.title}
        </div>

        <div>
          {" "}
          <img
            src={formData.image}
            className="w-[900px] h-[500px] object-cover bg-gray-500 rounded-lg mt-4 "
          />
        </div>

        <div className="mt-4">
          <div className="  mt-2 mb-2 text-4xl font-serif">Idea</div>
          <div className="max-w-[900px] break-words  mt-4 mb-16">
            {formData.idea}
          </div>
        </div>

        <div className="mt-4">
          <div className="  mt-2 mb-2 text-4xl font-serif">Description</div>
          <div className="max-w-[900px] break-words  mt-4 mb-16">
            {formData.desc}
          </div>
        </div>

        <div className="mt-4">
          <div className="  mt-2 mb-2 text-4xl font-serif">Tips</div>
          <div className="max-w-[900px] break-words  mt-4 mb-16">
            {formData.tips}
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-semibold text-slate-400 ml-1">Email</h3>

            <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[800px] h-64"
              type="text"
              placeholder="Feedback"
              id="Fdesc"
              onChange={handlchange}
            />
          </div>

          <button
            className=" bg-blue-700 text-white p-3 rounded-lg w-[300px] h-11 hover:opacity-90"
            type="submit"
          >
            add feeedback
          </button>
        </form>
      </div>
    </div>
  );
}
