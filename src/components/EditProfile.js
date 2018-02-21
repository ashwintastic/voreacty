/*
<div class="container">
	<div class="taps-container" style="width:100%;">
			<div class="row user-info-block  edit-member">				
				<div class="col-md-12 p-lr-15">			
					<div class="tab-content m-0 p-0">
						<div id="editpro" class="tab-pane fade in active">
							<form id="Register_form" action="update-profile" method="POST">
								<div class="row">
									<div class="col-sm-offset-3 col-sm-6 col-sm-offset-3 p-l-15" data-mh="same-col-h">		
									    <fieldset>
											<legend>Basic Information</legend>
											<div id="editpic" class="form-group">
												<form id="Register_form" enctype="multipart/form-data" method="POST">
													<div class="row">

														<div class="col-sm-12">

															<div class="edit-pic">
																PIC
															</div>
															
														</div>

														<div class="col-sm-12">

															<div class="form-group element">
																<div class="choose-pic"><i class="fa fa-camera" id="update_pphoto" title="Select Picture"></i></div>
																<input type="file" id="ppicture" name="picture" aria-describedby="picture_help" >
															</div>
														</div>
													</div>
												</form>
											</div>
														
											<div class="form-group">
												<label class="display-block" for="name">Name</label>
												<input type="text" class="form-control" id="name" name="name" aria-describedby="name_help" value="@yield('editName')" placeholder="Name">
												
											</div>
											<div class="form-group">
												<label class="display-block" for="surname">Surname</label>
												<input type="text" class="form-control" id="surname" name="surname" aria-describedby="surname_help" value="@yield('editSurname')">
												
											</div>																
											<div class="form-group">
												<label class="display-block" for="email">Email</label>
												<input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" value="@yield('editEmail')" placeholder="Enter email">
												
											</div>
											<div class="form-group">
												<label class="display-block" for="country">Country</label>
												<select class="form-control" id="country" name="country"  aria-describedby="countryHelp" placeholder="Country">
													
													<option value="South Africa">New York</option>
													<option value="Cuba">Cuba</option>
													<option value="Botswana">Botswana</option>
													<option value="Lesotho">Spain</option>
													<option value="Lesotho">Brazil</option>
												</select>
												@if($errors->has('country'))<small id="countryHelp" class="form-text text-muted">{{$errors->first('country')}}</small>@endif
											</div>	

											<div class="form-group">
												<label class="display-block" for="quali">Interest</label>

												<div id="Interest_list"></div>
												<div class="input-group">
													<select class="form-control" id="interest" name="quali" aria-describedby="quali_help"  placeholder="Interest">
														<option value="interest">Choose the interest</option>
														<option value="Science">Science</option>
														<option value="Health">Health</option>
														<option value="Art">Art</option>
														<option value="Social Media">Social Media</option>
														<option value="Business">Business</option>
														<option value="Marketing">Marketing</option>
														<option value="Fashion">Fashion</option>
														<option value="Comics">Comics</option>
														<option value="Technology">Technology</option>
														<option value="Business">Business</option>
														<option value="Celebrity">Celebrity</option>
														<option value="Engineering">Engineering</option>
														<option value="ICT">ICT</option>
														<option value="Design">Design</option>
														<option value="Film and Video">Film and Video</option>
														<option value="Games">Games</option>
														<option value="Lifestyle">Lifestyle</option>
														<option value="Advertising">Advertising</option>
														<option value="Digital">Digital</option>
														<option value="Entrepreneur">Entrepreneur</option>
														<option value="Promotions">Promotions</option>
														<option value="Recruitment">Recruitment</option>

													</select>
													@if($errors->has('quali'))<small id="quali_help" class="form-text text-muted">{{$errors->first('quali')}}</small>@endif
													<span class="input-group-btn"><input class="btn btn-default" type="button" id="addinterest" value="ADD"/></span>
												</div><!-- /input-group -->
											</div>
											<div class="col-sm-12 m-t-20">
												<button type="submit" class="btn btn-primary">SAVE</button>
												<input type="hidden" id="user_id" name="user_id" value="{{Auth::user()->id}}">
												<input type="hidden" id="id" name="id" value="@yield('editid')">
											</div>														
										</fieldset>
									</div>
								</div><!--/.row-->
							</form>
						</div>
					</div>
				</div>
			</div>
	</div>
</div>*/
