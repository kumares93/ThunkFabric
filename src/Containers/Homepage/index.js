import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchData, fetchDataLoading, fetchDataSuccess, fetchDataFailure} from '../../Actions';
import { rootURL } from '../../Constants';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IDropdownControlledExampleState {
  selectedItem?: { key: string | number | undefined };
}
class Homepage extends React.PureComponent<{}, IDropdownControlledExampleState> {
constructor(props){
    super(props);
    this.state={
        department:[
            { key: '0', text: 'HR',id:[
                { key: '1', text: '1' },
                { key: '2', text: '2' },
                { key: '3', text: '3' },
                { key: '4', text: '4' },
                { key: '5', text: '5' },              
              ] },
            { key: '1', text: 'Engineering',id:[
                { key: '6', text: '6' },
                { key: '7', text: '7' },
                { key: '8', text: '8' },
                { key: '9', text: '9' },
                { key: '10', text: '10' },              
              ] },
          ]
        }
}
    
    states: IDropdownControlledExampleState = {
        selectedItem: undefined
      };
    _onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        console.log(`Selection change: ${item.key} ${item.selected ? 'selected' : 'unselected'}`);
        this.setState({ selectedItem: item });
      };
      _onChangeId = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        console.log(`Selection change: ${item.key} ${item.selected ? 'selected' : 'unselected'}`);
        this.setState({ id: item });
      };
    componentDidMount() {
        this.props.fetchData(rootURL)
    }
    idSelect=() =>{
        if(this.state.department[this.state.selectedItem])
         return this.state.department[this.state.selectedItem.key].id
        else return [{ key: '1', text: '1' },{ key: '2', text: '2' },{ key: '3', text: '3' },{ key: '4', text: '4' },{ key: '5', text: '5' },              
          ]  }
     _alertClicked=()=>{
        this.props.fetchData(rootURL+this.state.id.key)
          }
    render() {
        const { selectedItem } = this.states;
        const { itemReducer,itemLoading } = this.props
        console.log(itemReducer);
        
        if(itemLoading) {
            return <p> Loading......</p>
        }
        return (
            <div>
            <div class="inner">
            <Dropdown
            label="Departments"
            selectedKey={selectedItem ? selectedItem.key : undefined}
            onChange={this._onChange}
            placeholder="Select an option"
            options={this.state.department}
            styles={{ dropdown: { width: 300 } }}
          />
            </div>
            <div class="inner">
            <Dropdown
            label="Employee ID:"
            selectedKey={selectedItem ? selectedItem.key : undefined}
            
            onChange={this._onChangeId}
            placeholder="Select an option"
            options={this.idSelect()}
            styles={{ dropdown: { width: 300 } }}
          />
            </div>
            <PrimaryButton
            data-automation-id="test"
            text="Get Details"
            onClick={this._alertClicked}
            allowDisabledFocus={true}
          />
          <div className="img">
          
          </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP : ',state.itemLoading)
    return {
        itemReducer: state.items,
        itemLoading: state.itemLoading,
        itemLoadingError: state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchData,
        fetchDataLoading,
        fetchDataFailure
    },
    dispatch
)

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);