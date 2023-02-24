import { AddAdsModalTop, DetailAdsView } from "./detail";
import { useNavigate } from "react-router-dom";
import { UseCone,ConePositionValue, SetConeTempValue } from "../../../redux/ConeAssetsReducer";
import { AdsUpload, CategorySelectValue, infoValue,TokenDepositValue,AdsRewardValue } from "../../../redux/AdsUploadReducer";
import { useDispatch,useSelector } from "react-redux";
import { StepCircle } from "./addAdsStep";
import CheckConeMap from "../../map/CheckConeMap";

const BackNextButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const Back = () => {
      return (
        <div
          className="ModalSmallButton"
          onClick={() => navigate(-1)}>
          Back
        </div>
      );
    };
    const Upload = () => {
      const Position = useSelector(ConePositionValue);
      const basket = useSelector(SetConeTempValue);

      const Save =()=> {
        dispatch(AdsUpload([Position,basket]));
        dispatch(UseCone());
        navigate("/");
      }
      return (
        <div
          onClick={Save}
          className="ModalSmallButton">
          Upload
        </div>
      );
    };

    return (
        <div className="ButtonPosition">
          <Back />
          <Upload />
        </div>
    );
};

const AdsInfo = () => {
  const infovalue = useSelector(infoValue);
  const CategoryValue = useSelector(CategorySelectValue);
  const DepositToken = useSelector(TokenDepositValue);
  const RewardToken = useSelector(AdsRewardValue);
  const Category = () => {
    return(
      CategoryValue.map((index)=> {
        return(
          <div key={index} className="CategoryInfo">{index}</div>
        )
      })
    )
  }
  return (
    <section className="adsinfo">
      <div className="InfoSmallTitle">Title</div>
      <div className="CheckText">{infovalue[0].title}</div>
      <div className="InfoSmallTitle">Description</div>
      <div className="CheckText">{infovalue[0].description}</div>
      <div className="InfoSmallTitle">Category</div>
      <section className="CategoryInfoSection">{Category()}</section>
      <section className="Token">
        <div className="InfoSmallTitle">Deposit Token
          <div className="CheckValue">{DepositToken}</div>
        </div>
        <div className="InfoSmallTitle">Reward per Person
          <div className="CheckValue">{RewardToken}</div>
        </div>
      </section>
    </section>
  );
}


const leftBody = () => {
  // infoValue
  return(
      <section className="BodyLeft">
        <div className="BodyTitle">CheckAds</div>
          {AdsInfo()}
        <section className="ConeArea">
          <div className="InfoSmallTitle">ConeArea</div>
          <div className="ConeAreaMap"><CheckConeMap /></div>
        </section>
      </section>    
  )
}

const Check = () => {
  document.body.style = `overflow-y: hidden`;
    return (
        <div className="Container">
      <div className="Background">
        <div className="Modal">
            <AddAdsModalTop/>
            <StepCircle/>
            <section className="AddAds_Modal_body">
              {leftBody()}
              <DetailAdsView />
            </section>
            <BackNextButton/>
        </div>
      </div>
    </div>
  )
}

export default Check;