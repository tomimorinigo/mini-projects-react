import { TwitterFollowCard } from "./TwitterFollowCard";

function App(){

    const users = [{
        userName: "midudev",
        name: "Miguel Angel Duran",
        initialIsFollowing: false
    },{
        userName: "tomiimorinigo",
        name: "Tomas Morinigo",
        initialIsFollowing: false
    },{
        userName: "elonmusk",
        name: "Elon Musk",
        initialIsFollowing: false
    },{
        userName: "vxnder",
        name: "VamderHART",
        initialIsFollowing: false
    
    },{
        userName: "jazhuppi",
        name: "Jazmin",
        initialIsFollowing: true
    }]

    return(
        <section className="App">
            {
                users.map((user) => (
                    <TwitterFollowCard 
                        key={user.userName}
                        userName={user.userName}
                        name={user.name}
                        initialIsFollowing={user.initialIsFollowing}
                    />
                ))
            }
        </section>
    );
}

export default App;