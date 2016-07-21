/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.arduboy');

goog.require('Blockly.Arduino');

Blockly.Arduino['setup_arduboy'] = function(block) {
  var value_frame_rate = Blockly.Arduino.valueToCode(block, 'frame_rate', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.addInclude('eeprom', '#include <EEPROM.h>');
  Blockly.Arduino.addInclude('spi', '#include <SPI.h>');
  Blockly.Arduino.addInclude('arduboy', '#include <Arduboy.h>');
  
  Blockly.Arduino.addDeclaration('arduboy_instance', 'Arduboy arduboy;');
  
  var setupCode =  'arduboy.begin();\n  arduboy.setFrameRate(' + value_frame_rate + ');\n';
  Blockly.Arduino.addSetup('arduboy_setup', setupCode, true);
  
  var code = 'if(!(arduboy.nextFrame()))\n  return;\n';
  return code;
};

Blockly.Arduino['arduboy_clear'] = function(block) {
  var code = 'arduboy.clear();\n';
  return code;
};

Blockly.Arduino['arduboy_display'] = function(block) {
  var code = 'arduboy.display();\n';
  return code;
};

Blockly.Arduino['arduboy_print_text'] = function(block) {
  var value_text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC);
  var value_x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var value_y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'arduboy.setCursor('+ value_x + ', ' + value_y + ');\narduboy.print(F('+ value_text + '));\n';
  return code;
};

Blockly.Arduino['arduboy_print'] = function(block) {
  var value_text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC);
  var value_x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var value_y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
  // TODO: Assemble Arduino into code variable.
  var code = 'arduboy.setCursor('+ value_x + ', ' + value_y + ');\narduboy.print('+ value_text + ');\n';
  return code;
};

Blockly.Arduino['draw_rectangle'] = function(block) {
  var value_x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var value_y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var value_width = Blockly.Arduino.valueToCode(block, 'width', Blockly.Arduino.ORDER_ATOMIC);
  var value_height = Blockly.Arduino.valueToCode(block, 'height', Blockly.Arduino.ORDER_ATOMIC);
  var value_filled = Blockly.Arduino.valueToCode(block, 'filled', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_color = block.getFieldValue('color');
  // TODO: Assemble Arduino into code variable.
  var rectCode = 'arduboy.' + ((value_filled=='true') ? 'fillRect(' : 'drawRect('); 
  var code = rectCode + value_x + ',' + value_y + ',' + value_width + ',' + value_height + ',' + dropdown_color + ');\n';
  return code;
};
