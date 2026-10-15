import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell, BriefcaseBusiness, CalendarDays, ChevronRight, CircleUserRound,
  GraduationCap, Heart, LayoutDashboard, MessageCircle, Moon, Search,
  Settings, ShieldCheck, Sparkles, Sun, Users, Video, Plus, MapPin,
  Clock3, ArrowUpRight, CheckCircle2, Menu, X, Filter, Star, Send,
  BookOpen, Building2, TrendingUp, UserPlus
} from "lucide-react";
import "./styles.css";

const mentors = [
  { name:"Ananya Rao", role:"Product Manager", company:"Microsoft", location:"Bengaluru", exp:"8 yrs", skills:["Product","AI","Leadership"], match:96, avatar:"AR" },
  { name:"Rahul Mehta", role:"Software Engineer", company:"Google", location:"Hyderabad", exp:"6 yrs", skills:["React","Cloud","System Design"], match:92, avatar:"RM" },
  { name:"Priya Sharma", role:"Data Scientist", company:"Amazon", location:"Chennai", exp:"7 yrs", skills:["Python","ML","Analytics"], match:89, avatar:"PS" },
  { name:"Arjun Nair", role:"Founder & CEO", company:"NovaLabs", location:"Pune", exp:"11 yrs", skills:["Startups","Fundraising","Strategy"], match:86, avatar:"AN" }
];

const events = [
  { title:"Alumni Career Summit 2026", date:"Oct 18", time:"10:00 AM", place:"Main Auditorium", type:"Conference", seats:180, joined:126 },
  { title:"Crack Your Product Interview", date:"Oct 22", time:"6:30 PM", place:"Online · Zoom", type:"Workshop", seats:100, joined:74 },
  { title:"Startup Founders Networking Night", date:"Oct 28", time:"5:00 PM", place:"Innovation Hub", type:"Networking", seats:80, joined:52 }
];

const jobs = [
  { title:"Frontend Engineer", company:"Microsoft", location:"Bengaluru · Hybrid", tag:"Full-time", salary:"₹18–28 LPA" },
  { title:"Product Intern", company:"Amazon", location:"Hyderabad · On-site", tag:"Internship", salary:"₹60K/month" },
  { title:"Data Analyst", company:"Deloitte", location:"Pune · Hybrid", tag:"Full-time", salary:"₹9–14 LPA" }
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [eventModal, setEventModal] = useState(false);
  const [toast, setToast] = useState("");
  const [joined, setJoined] = useState({});
  const [saved, setSaved] = useState({});
  const [connected, setConnected] = useState({});

  const filteredMentors = useMemo(() =>
    mentors.filter(m => (m.name+" "+m.role+" "+m.company+" "+m.skills.join(" ")).toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const nav = [
    ["Dashboard", LayoutDashboard], ["Mentors", Users], ["Events", CalendarDays],
    ["Jobs", BriefcaseBusiness], ["Community", MessageCircle], ["My Profile", CircleUserRound]
  ];

  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className={mobile ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={23}/></div>
          <div><strong>Alumni<span>Connect</span></strong><small>CAREER NETWORK</small></div>
          <button className="close-menu" onClick={()=>setMobile(false)}><X/></button>
        </div>
        <div className="nav-label">MAIN MENU</div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button key={label} className={page===label ? "nav-item active" : "nav-item"} onClick={()=>{setPage(label);setMobile(false)}}>
              <Icon size={19}/><span>{label}</span>{label==="Community" && <b>4</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <Sparkles size={22}/>
          <strong>Unlock your career</strong>
          <p>Get matched with alumni mentors and discover opportunities.</p>
          <button onClick={()=>{setPage("Mentors");notify("Opening mentor matching")}}>Find a mentor <ArrowUpRight size={15}/></button>
        </div>
        <button className="nav-item bottom"><Settings size={19}/>Settings</button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={()=>setMobile(true)}><Menu/></button>
          <div className="searchbox"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search mentors, jobs, events..."/></div>
          <div className="top-actions">
            <button className="icon-btn" onClick={()=>setDark(!dark)} title="Toggle theme">{dark?<Sun size={19}/>:<Moon size={19}/>}</button>
            <button className="icon-btn" onClick={()=>notify("You have 3 new notifications")}><Bell size={19}/><i></i></button>
            <div className="user"><div className="avatar me">TS</div><div><strong>Student User</strong><span>Computer Science</span></div></div>
          </div>
        </header>

        <div className="content">
          {page==="Dashboard" && <Dashboard setPage={setPage} notify={notify} joined={joined} setJoined={setJoined} saved={saved} setSaved={setSaved} connected={connected} setConnected={setConnected}/>}
          {page==="Mentors" && <Mentors mentors={filteredMentors} connected={connected} setConnected={setConnected} notify={notify}/>}
          {page==="Events" && <Events joined={joined} setJoined={setJoined} notify={notify} openModal={()=>setEventModal(true)}/>}
          {page==="Jobs" && <Jobs saved={saved} setSaved={setSaved} notify={notify}/>}
          {page==="Community" && <Community notify={notify}/>}
          {page==="My Profile" && <Profile notify={notify}/>}
        </div>
      </main>

      {eventModal && <EventModal close={()=>setEventModal(false)} notify={notify}/>}
      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    </div>
  );
}

function PageHeader({eyebrow,title,desc,action}) {
  return <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>
}

function Dashboard({setPage,notify,joined,setJoined,saved,setSaved,connected,setConnected}) {
  return <div>
    <PageHeader eyebrow="GOOD AFTERNOON, STUDENT 👋" title="Build your career through your alumni network." desc="Connect with experienced alumni, find opportunities, and grow together." action={<button className="primary" onClick={()=>setPage("Mentors")}><UserPlus size={17}/> Find a mentor</button>}/>
    <section className="hero">
      <div><div className="hero-kicker"><Sparkles size={15}/> YOUR PERSONAL CAREER HUB</div><h2>One network.<br/><em>Endless possibilities.</em></h2><p>You've got a powerful alumni community behind you. Start a conversation, join an event, or discover your next opportunity.</p><div className="hero-actions"><button onClick={()=>setPage("Mentors")} className="hero-btn">Explore mentors <ChevronRight size={16}/></button><button onClick={()=>setPage("Events")} className="hero-link">View upcoming events</button></div></div>
      <div className="hero-art"><div className="orbit o1"></div><div className="orbit o2"></div><div className="floating-card c1"><Users size={16}/><b>2,840+</b><span>Alumni</span></div><div className="floating-card c2"><BriefcaseBusiness size={16}/><b>320+</b><span>Opportunities</span></div><div className="hero-center"><GraduationCap size={38}/></div></div>
    </section>
    <div className="stats">
      <Stat icon={Users} value="2,840" label="Alumni members" trend="+12% this month"/>
      <Stat icon={UserPlus} value="18" label="Mentor connections" trend="+4 this week"/>
      <Stat icon={CalendarDays} value="6" label="Events this month" trend="3 new"/>
      <Stat icon={BriefcaseBusiness} value="42" label="Open opportunities" trend="+8 today"/>
    </div>
    <div className="grid-2">
      <section className="panel"><div className="panel-head"><div><h3>Recommended mentors</h3><p>Based on your interests and goals</p></div><button className="text-btn" onClick={()=>setPage("Mentors")}>View all <ChevronRight size={15}/></button></div>
        <div className="mentor-list">{mentors.slice(0,3).map(m=><MentorRow key={m.name} m={m} connected={connected} setConnected={setConnected} notify={notify}/>)}</div>
      </section>
      <section className="panel"><div className="panel-head"><div><h3>Upcoming events</h3><p>Learn, connect and grow</p></div><button className="text-btn" onClick={()=>setPage("Events")}>View all <ChevronRight size={15}/></button></div>
        {events.slice(0,2).map(e=><EventRow key={e.title} e={e} joined={joined} setJoined={setJoined} notify={notify}/>)}
      </section>
    </div>
    <section className="panel opportunities"><div className="panel-head"><div><h3>Fresh opportunities</h3><p>Jobs and internships posted by alumni</p></div><button className="text-btn" onClick={()=>setPage("Jobs")}>Browse jobs <ArrowUpRight size={15}/></button></div>
      <div className="job-grid">{jobs.map(j=><JobCard key={j.title} j={j} saved={saved} setSaved={setSaved} notify={notify}/>)}</div>
    </section>
  </div>
}

function Stat({icon:Icon,value,label,trend}) { return <div className="stat"><div className="stat-icon"><Icon size={19}/></div><div><strong>{value}</strong><span>{label}</span><small>{trend}</small></div></div> }

function MentorRow({m,connected,setConnected,notify}) {
  const yes=connected[m.name]; return <div className="mentor-row"><div className="avatar">{m.avatar}</div><div className="row-main"><strong>{m.name}</strong><span>{m.role} · {m.company}</span><small><MapPin size={12}/>{m.location} · {m.exp}</small></div><div className="match">{m.match}% match</div><button className={yes?"small-btn connected":"small-btn"} onClick={()=>{setConnected({...connected,[m.name]:!yes});notify(yes?"Connection removed":"Connection request sent")}}>{yes?<CheckCircle2 size={15}/>:<UserPlus size={15}/>} {yes?"Connected":"Connect"}</button></div>
}

function EventRow({e,joined,setJoined,notify}) {
  const yes=joined[e.title]; return <div className="event-row"><div className="date-box"><b>{e.date.split(" ")[1]}</b><span>{e.date.split(" ")[0]}</span></div><div className="row-main"><strong>{e.title}</strong><span><Clock3 size={12}/>{e.time} · {e.place}</span><small>{e.joined}/{e.seats} registered</small></div><button className={yes?"small-btn connected":"small-btn"} onClick={()=>{setJoined({...joined,[e.title]:!yes});notify(yes?"Registration cancelled":"You're registered for the event!")}}>{yes?"Registered":"Join event"}</button></div>
}

function Mentors({mentors,connected,setConnected,notify}) {
 return <><PageHeader eyebrow="ALUMNI NETWORK" title="Find your mentor" desc="Connect with alumni who can help you take your next career step." action={<button className="secondary"><Filter size={16}/> Filters</button>}/><div className="filterbar"><div className="pill active">All mentors</div><div className="pill">Technology</div><div className="pill">Product</div><div className="pill">Data & AI</div><div className="pill">Entrepreneurship</div><div className="pill">Leadership</div></div><div className="mentor-cards">{mentors.map(m=><div className="mentor-card" key={m.name}><div className="card-top"><div className="avatar lg">{m.avatar}</div><span className="match-badge">{m.match}% match</span></div><h3>{m.name}</h3><p>{m.role} at <b>{m.company}</b></p><span className="location"><MapPin size={13}/>{m.location} · {m.exp} experience</span><div className="tags">{m.skills.map(s=><span key={s}>{s}</span>)}</div><div className="card-actions"><button className={connected[m.name]?"small-btn connected":"primary"} onClick={()=>{setConnected({...connected,[m.name]:!connected[m.name]});notify(connected[m.name]?"Connection removed":"Mentor connection request sent")}}>{connected[m.name]?<CheckCircle2 size={15}/>:<MessageCircle size={15}/>} {connected[m.name]?"Connected":"Connect"}</button><button className="icon-btn"><Video size={17}/></button></div></div>)}</div></>
}

function Events({joined,setJoined,notify,openModal}) {
 return <><PageHeader eyebrow="COMMUNITY CALENDAR" title="Events & experiences" desc="Meet alumni, learn from experts, and build your network." action={<button className="primary" onClick={openModal}><Plus size={17}/> Create event</button>}/><div className="event-banner"><div><span>UP NEXT</span><h2>Alumni Career Summit 2026</h2><p>Meet 30+ alumni leaders across technology, finance, consulting and startups.</p><button className="hero-btn" onClick={()=>notify("Event details opened")}>View event details <ArrowUpRight size={15}/></button></div><CalendarDays size={92}/></div><div className="event-grid">{events.map(e=><div className="event-card" key={e.title}><div className="event-cover"><span>{e.type}</span><CalendarDays size={28}/></div><div className="event-body"><div className="event-date">{e.date} · {e.time}</div><h3>{e.title}</h3><p><MapPin size={13}/>{e.place}</p><div className="event-footer"><small>{e.joined}/{e.seats} spots filled</small><button className={joined[e.title]?"small-btn connected":"small-btn"} onClick={()=>{setJoined({...joined,[e.title]:!joined[e.title]});notify(joined[e.title]?"Registration cancelled":"You're registered!")}}>{joined[e.title]?"Registered":"Register"}</button></div></div></div>)}</div></>
}

function Jobs({saved,setSaved,notify}) {
 return <><PageHeader eyebrow="CAREER OPPORTUNITIES" title="Jobs & internships" desc="Discover roles shared by alumni and trusted companies." action={<button className="secondary"><Filter size={16}/> Filters</button>}/><div className="job-tabs"><span className="active">All opportunities</span><span>Jobs</span><span>Internships</span><span>Remote</span><span>My saved</span></div><div className="jobs-list">{[...jobs,...jobs].map((j,i)=><div className="job-item" key={i}><div className="company-logo">{j.company[0]}</div><div className="job-main"><div><span className="job-tag">{j.tag}</span><h3>{j.title}</h3></div><p><Building2 size={13}/>{j.company} · <MapPin size={13}/>{j.location}</p></div><div className="job-salary">{j.salary}<small>Posted 2 days ago</small></div><button className="icon-btn" onClick={()=>{setSaved({...saved,[i]:!saved[i]});notify(saved[i]?"Removed from saved":"Saved opportunity")}}>{saved[i]?<Heart fill="currentColor" size={18}/>:<Heart size={18}/>}</button><button className="small-btn" onClick={()=>notify("Application flow opened")}>Apply <ArrowUpRight size={14}/></button></div>)}</div></>
}

function Community({notify}) {
 return <><PageHeader eyebrow="ALUMNI COMMUNITY" title="Learn together. Grow together." desc="Ask questions, share wins, and build meaningful professional relationships." action={<button className="primary" onClick={()=>notify("Post composer opened")}><Plus size={17}/> Create post</button>}/><div className="community-grid"><div className="feed"><div className="composer"><div className="avatar me">TS</div><button onClick={()=>notify("Post composer opened")}>Share something with the alumni community...</button></div>{[
 ["Meera Kapoor","Senior UX Designer · Adobe","Just finished mentoring my third student this month. Seeing someone gain confidence in their career journey is incredibly rewarding!","42","8"],
 ["Vikram Singh","Alumni · Class of 2021","Does anyone working in fintech have 15 minutes this week? I'd love to understand how you made the transition from software engineering to product.","18","5"]
].map((p,i)=><article className="post" key={i}><div className="post-head"><div className="avatar">{p[0].split(" ").map(x=>x[0]).join("")}</div><div><strong>{p[0]}</strong><span>{p[1]} · 2h</span></div><button className="icon-btn">•••</button></div><p>{p[2]}</p><div className="post-actions"><button onClick={()=>notify("Post liked")}><Heart size={16}/> {p[3]}</button><button onClick={()=>notify("Comments opened")}><MessageCircle size={16}/> {p[4]}</button><button onClick={()=>notify("Post shared")}><Send size={15}/> Share</button></div></article>)}</div><aside className="side-panels"><div className="panel"><h3>Trending topics</h3>{["#ProductManagement","#AlumniMentorship","#CampusToCareer","#AIandML","#StartupStories"].map((x,i)=><div className="trend" key={x}><span>0{i+1}</span><b>{x}</b><small>{120-i*17} posts</small></div>)}</div><div className="panel"><h3>Community guidelines</h3><p className="muted">Be respectful, share knowledge, and keep conversations career-focused.</p><div className="guideline"><ShieldCheck size={18}/> Verified alumni profiles</div><div className="guideline"><BookOpen size={18}/> Knowledge-first community</div></div></aside></div></>
}

function Profile({notify}) {
 return <><PageHeader eyebrow="YOUR PROFILE" title="Student User" desc="Make it easy for alumni to understand how they can help you." action={<button className="primary" onClick={()=>notify("Profile editor opened")}>Edit profile</button>}/><div className="profile-grid"><div className="profile-card panel"><div className="profile-cover"></div><div className="profile-info"><div className="avatar xl me">TS</div><h2>Student User</h2><p>Computer Science · Class of 2027</p><span><MapPin size={13}/> India · Open to mentorship</span><div className="profile-stats"><div><b>18</b><small>Connections</small></div><div><b>6</b><small>Events joined</small></div><div><b>12</b><small>Skills</small></div></div></div></div><div className="panel"><h3>Career interests</h3><p className="muted">Help mentors understand what you're looking for.</p><div className="tags large"><span>Software Engineering</span><span>Product</span><span>Artificial Intelligence</span><span>Startups</span><span>Leadership</span></div><hr/><h3>About</h3><p className="about">Computer science student passionate about building useful products, learning from experienced professionals, and creating a strong alumni network.</p></div></div></>
}

function JobCard({j,saved,setSaved,notify}) { const id=j.title; return <div className="job-card"><div className="company-logo">{j.company[0]}</div><span className="job-tag">{j.tag}</span><h3>{j.title}</h3><p>{j.company}</p><small><MapPin size={12}/>{j.location}</small><div className="job-card-bottom"><b>{j.salary}</b><button className="icon-btn" onClick={()=>{setSaved({...saved,[id]:!saved[id]});notify(saved[id]?"Removed from saved":"Saved opportunity")}}>{saved[id]?<Heart fill="currentColor" size={17}/>:<Heart size={17}/>}</button></div></div> }

function EventModal({close,notify}) {
 const [title,setTitle]=useState(""); const [date,setDate]=useState("");
 return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">CREATE EXPERIENCE</span><h2>Publish an event</h2></div><button className="icon-btn" onClick={close}><X/></button></div><label>Event title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Alumni Tech Networking Night"/></label><div className="form-row"><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Event type<select><option>Networking</option><option>Workshop</option><option>Conference</option><option>Webinar</option></select></label></div><label>Location<input placeholder="Venue or meeting link"/></label><label>Description<textarea placeholder="Tell alumni what they will learn or experience..."></textarea></label><div className="modal-actions"><button className="secondary" onClick={close}>Cancel</button><button className="primary" onClick={()=>{close();notify(title?`"${title}" published successfully`:"Event published successfully")}}><Plus size={16}/> Publish event</button></div></div></div>
}

createRoot(document.getElementById("root")).render(<App/>);
