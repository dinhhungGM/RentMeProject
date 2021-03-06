import React from "react";
import { useHistory } from "react-router";
import "./ContentHome.scss";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import axios from "axios";
import { useEffect, useState, memo } from "react";


function ContentHome() {
  const history = useHistory();
  const [channel, setChannel] = useState("");
  const calllApi = async () => {
    try {
      // Get access token
      let options;
      let res;
      options = {
        url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&client_secret=${process.env.REACT_APP_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
        method: "POST",
      };
      res = await axios(options);
      const ACCESS_TOKEN = res.data.access_token;

      // Call api to get top 5 streaming video on twitch

      options = {
        url: "https://api.twitch.tv/helix/streams?first=5",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
        },
        mehod: "GET",
      };
      // Pick 1 in 5 to setChannel
      res = await axios(options);
      const { data } = res.data;

      const randomChanel = Math.floor(Math.random() * data.length);

      setChannel(data[randomChanel].user_login);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    calllApi();
    
  }, []);
  
  
  return (
    <div
      className="container__content"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="content__services">
        <div className="main__services">
          <div className="main__services--title">
            Personalized service for both in-game and life
          </div>
          <div className="main__services--content row">
            <div className="left__items col-6">
              <div>
                <div className="left__items--games mb-3">
                  <div className="game__title">* Games</div>
                  <div className="games__infor mt-2">
                    <p>1 on 1, Coaching, Matching, Team up, Streamer</p>
                    <div className="d-flex align-items-center">
                      <div className="game__infor--items">
                        <div>DUNGEON CRAWL</div>
                      </div>
                      <div className="game__infor--items">
                        <div>GRINDING RANKED</div>
                      </div>
                      <div className="game__infor--items">
                        <div>LOOT AND SHOOT</div>
                      </div>
                      <div className="game__infor--items">
                        <div>TANK DAMAGE FOR YOU</div>
                      </div>
                      <div className="game__infor--items">
                        <div>YOUR POCKET HEALER</div>
                      </div>
                      <div className="game__infor--items">
                        <div>HARD CARRY</div>
                      </div>
                      <div className="game__infor--items">
                        <div>PERFECT TEAMWORK</div>
                      </div>
                      <div className="game__infor--items">
                        <div>GREAT CONVERSATION</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="left__items--lifestyle mb-3">
                  <div className="game__title">* Styles</div>
                  <div className="games__infor mt-2">
                    <p>Find ePals to carry and enrich your life</p>
                    <div className="d-flex align-items-center">
                      <div className="game__infor--items">
                        <div>VOICE CHAT</div>
                      </div>
                      <div className="game__infor--items">
                        <div>KARAOKE</div>
                      </div>
                      <div className="game__infor--items">
                        <div>WATCH MOVIES TOGETHER</div>
                      </div>
                      <div className="game__infor--items">
                        <div>RELATIONSHIP ADVICE</div>
                      </div>
                      <div className="game__infor--items">
                        <div>EMOTIONAL SUPPORT</div>
                      </div>
                      <div className="game__infor--items">
                        <div>WAKE-UP CALL</div>
                      </div>
                      <div className="game__infor--items">
                        <div>SLEEP CALL</div>
                      </div>
                      <div className="game__infor--items">
                        <div>ASMR</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button__search">
                <button
                  className="button-purple"
                  onClick={() => {
                    history.push("/signin");
                  }}
                >
                  <span>Try it out now</span>
                </button>
              </div>
            </div>
            <div className="right__items col-6">
              <div className="video">
                <ReactTwitchEmbedVideo
                  channel={channel || "valorant"}
                  width="100%"
                  height="380"
                  layout="video"
                  autoplay="false"
                  targetClass="youtube__video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ContentHome);
