import React, {Component, PropTypes} from "react";

import FlatButton from "material-ui/FlatButton";
import Dialog     from "material-ui/Dialog";
import TextField  from "material-ui/TextField";

import Config      from "../../../Models/Config";
import FileService from "../../../Services/FileService";

export default class DownloadFileDialog extends Component {
    constructor(props) {
        super(props);
        let path = Config.find("download-folder").value;
        this.folder = path ? path + "/" : "";
        this.fs = new FileService(Config);
    }
    render() {
        return (
          <Dialog
            title="Save file name"
            actions={[
                this.renderCancelButton(),
                this.renderSaveButton()
            ]}
            modal={false}
            open={this.props.dialogOpened}
            >
            ~/Downloads/{this.folder}<TextField name="foo" defaultValue={this.fs.getDefaultDownloadFileName()} ref="filename"/>.png
          </Dialog>
        );
    }
    renderCancelButton() {
        return <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.props.closeDialog}
        />;
    }
    renderSaveButton() {
        return <FlatButton
          label="Save"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.props.saveFile}
        />;
    }
    getValue() {
        return this.folder + this.refs.filename.getValue();
    }
    static propTypes = {
        dialogOpened: PropTypes.any,
        closeDialog:  PropTypes.any,
        saveFile:     PropTypes.any,
    }
}
