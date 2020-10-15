import React from "react";
import "./App.scss";
import TOC from "./components/TOC";
import Title from "./components/Title";
import Subject from "./components/Subject";
import ResetBtn from "./components/ResetBtn";
import Control from "./components/Control";
import CreateSubject from "./components/CreateSubject";
import UpdateSubject from "./components/UpdateSubject";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      mainList_id: 1,
      welcome: { title: "welcome", desc: "Hello, React!!" },
      mainTitle: { title: "web", content: "World Wide Web!" },
      mainList: [
        { id: 1, title: "html", desc: "HTML is hypertext" },
        { id: 2, title: "css", desc: "css is for design" },
        { id: 3, title: "Javascript", desc: "javascript is for interactive" },
      ],
    };
  }

  getReadContent() {
    let i = 0;
    while (i < this.state.mainList.length) {
      var data = this.state.mainList[i];
      if (data.id === this.state.mainList_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title = null;
    var _desc = null;
    var _article = null;
    var _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <Subject title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      _content = this.getReadContent();
      _article = <Subject title={_content.title} desc={_content.desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateSubject
          onSubmit={(_title, _desc) => {
            console.log(_title, _desc);
            this.max_content_id = this.max_content_id + 1;
            var _mainList = this.state.mainList.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({ mainList: _mainList });
          }}
        />
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateSubject
          data={_content}
          onSubmit={(_title, _desc) => {
            console.log("hihihihi");
            console.log(_content);
          }}
        />
      );
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <ResetBtn
          onChangeBtn={() => {
            if (this.state.mode === "read") {
              this.setState({ mode: "welcome" });
            } else {
              alert("This is HomePage!!");
            }
          }}
        />
        <Title title={this.state.welcome.title} sub={this.state.welcome.desc} />
        <TOC
          // pageState={}
          onChangePage={(id) => {
            console.log(id);
            this.setState({
              mode: "read",
              mainList_id: Number(id),
            });
          }}
          data={this.state.mainList}
        />
        <Control
          onChangeMode={(_mode) => {
            this.setState({ mode: _mode });
          }}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
