import "./Tracks.css";

const TRACKS = [
  {
    color: "#FF2D8F",
    title: "Blood Donation",
    description:
      "Connect donors, blood banks and hospitals so help reaches people faster.",
  },
  {
    color: "#45D9FF",
    title: "Shelter Records",
    description:
      "Create systems to manage shelter information and improve accessibility.",
  },
  {
    color: "#FFB15C",
    title: "Elder Care",
    description:
      "Develop technology solutions that support elderly care and wellbeing.",
  },
  {
    color: "#FF8A1F",
    title: "Relief Logistics",
    description:
      "Design tools for faster and smarter disaster relief coordination.",
  },
  {
    color: "#8B4DFF",
    title: "Open NGO Problem",
    description:
      "Solve real-world challenges faced by NGOs and social organizations.",
  },
  {
    color: "#45D9FF",
    title: "Submit Yours",
    description:
      "Submit an NGO problem and allow teams to build solutions.",
  },
];


export default function Tracks() {

  return (

    <section className="tracks-section">

      <div className="tracks-container">


        {/* HEADER */}

        <div className="tracks-header">


          <p className="status">

            <span></span>

            SECTOR 03 // TRACK SELECTION // 20.2961° N · 85.8245° E

          </p>



          <h2>
            Problems Worth Solving
          </h2>



          <p className="lead">

            Pick a real problem from a real NGO and build working software for it.

          </p>


        </div>




        {/* TRACK GRID */}

        <div className="tracks-grid">


          {TRACKS.map((track, index) => (

            <div

              className="track-card"

              key={index}

              style={
                {
                  "--track-color": track.color,
                } as React.CSSProperties
              }

            >



              <div className="track-number">

                {String(index + 1).padStart(2, "0")}

              </div>




              <h3>

                {track.title}

              </h3>




              <p>

                {track.description}

              </p>




              <div className="arrow">

                →

              </div>



            </div>


          ))}


        </div>



      </div>


    </section>

  );

}