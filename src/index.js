import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//YouTube API Key
const API_KEY = 'AIzaSyBfRiZLwnOsW_OyDdRGvCUHU59UNqQLkqs'; 


         
// Create a new component. This should produce some HTML
// () =>  replaces "function()" in the declaration - virtually the equivalent
class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = { 
            videos: [],
            selectedVideo: null
        };
        
       this.videoSearch('surfboards');
        
    }
    
    videoSearch(term){
        YTSearch({key: API_KEY, term:term, maxResults: 50 }, (videos) => {
            //This evaluates as this.setState( { videos: videos }); since property and parameter share exact same name (ES6)
            this.setState( { 
                videos: videos,
                selectedVideo: videos[0]
            });
            
        });
    }
    
    render(){
        
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState( {selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
};

// Take this componenet's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));