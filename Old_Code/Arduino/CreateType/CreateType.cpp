#include <CreateType.h>
#include <Arduino.h>


  String character = ".";
  String AuxValuechar;

  struct Order{
        String Move = "";
        int Value = 0;
    };
  Order AddMyType(String MyStr){
  Order MyOrder;
  MyOrder.Move = "";
  MyOrder.Value = 0;

  int DotPos = MyStr.indexOf(character);
  //returns dot's position

  //puts order and value into the type
  if (DotPos = -1)
  {
    for(int i=0; i<MyStr.length(); i++){
      MyOrder.Move = MyOrder.Move + MyStr[i];
    }
  }
  else
  {
    for(int i=0; i<DotPos; i++){
      MyOrder.Move = MyOrder.Move + MyStr[i];
     }

    for(int i=DotPos+1; i<MyStr.length(); i++){
      AuxValuechar = AuxValuechar + MyStr[i];
    }
    MyOrder.Value = AuxValuechar.toInt();
    return MyOrder;
  }
}
